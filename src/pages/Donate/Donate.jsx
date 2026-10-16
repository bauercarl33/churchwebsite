import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import "./donate.css";
import ShopDivisor from "./ShopDivisor/ShopDivisor";
import ItemsGrid from "./ItemsGrid/ItemsGrid";
import { endpoints, fetchJson } from "../../lib/api";
import {
  paymentOptions,
  TITHELY_IMAGE,
  TITHELY_IMAGE_SIZE,
  TITHELY_LINK,
} from "../../data/donationOptions";

// Reserve an image's space before it loads (avoids layout shift) without
// setting a fixed height.
const aspect = ([width, height]) => ({ aspectRatio: `${width} / ${height}` });

// On this page the Zelle QR code is intentionally not a link
// (see commit 3217a4f "remove zelle clickable").
const qrOptions = {
  ...paymentOptions,
  zelle: { ...paymentOptions.zelle, link: "" },
};

export const fetchDonationItems = async () => {
  const result = await fetchJson(endpoints.donationItems);
  return result.body.items ?? [];
};

export const uniqueCategories = (items) => [
  ...new Set(items.map((item) => item.category).filter(Boolean)),
];

const Donate = () => {
  const [donationOption, setDonationOption] = useState("cashapp");
  const [donationpillStyle, setDonationpillStyle] = useState({ top: 0, left: 0, width: 0 });
  const [selectedCategory, setSelectedCategory] = useState("All");
  const selectorRef = useRef(null);

  const { data: items = [], refetch } = useQuery({
    queryKey: ["donationItems"],
    queryFn: fetchDonationItems,
  });
  const categories = useMemo(() => uniqueCategories(items), [items]);

  const updatePillPosition = useCallback(() => {
    const element = selectorRef.current?.querySelector(".item.selected");
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const selectorRect = selectorRef.current.getBoundingClientRect();
    setDonationpillStyle({
      top: rect.top - selectorRect.top - 1,
      left: rect.left - selectorRect.left,
      width: rect.width - 2,
      height: rect.height,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updatePillPosition);
    return () => window.removeEventListener("resize", updatePillPosition);
  }, [updatePillPosition]);

  useEffect(() => {
    updatePillPosition();
  }, [donationOption, updatePillPosition]);

  return (
    <>
      <div className="donate">
        <div className="col">
          <a href={TITHELY_LINK} target="_blank" rel="noreferrer" className="tithely">
            <p>Click here to donate with Tithely.</p>
            <img src={TITHELY_IMAGE} alt="Donate with Tithely" style={aspect(TITHELY_IMAGE_SIZE)} />
          </a>
          <div className="divider">
            <h5>Or</h5>
          </div>
          <p>Select a QR code and scan/click the link.</p>
          <div className="qrs">
            <div className="selector" ref={selectorRef} role="group" aria-label="Payment app">
              <div className="donationpill" style={donationpillStyle} aria-hidden="true" />
              {Object.entries(qrOptions).map(([key, value]) => (
                <button
                  type="button"
                  className={donationOption === key ? "item selected" : "item"}
                  key={key}
                  onClick={() => setDonationOption(key)}
                  aria-label={value.label}
                  aria-pressed={donationOption === key}
                >
                  {value.icon}
                </button>
              ))}
            </div>
            {Object.entries(qrOptions).map(([key, value]) => {
              const className = donationOption === key ? "qr selected" : "qr";
              const image = (
                <img src={value.qr} alt={`${value.label} QR code`} style={aspect(value.qrSize)} />
              );
              return value.link ? (
                <a
                  href={value.link}
                  target="_blank"
                  rel="noreferrer"
                  className={className}
                  key={`${key}_qr`}
                >
                  {image}
                </a>
              ) : (
                <div className={className} key={`${key}_qr`}>
                  {image}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <ShopDivisor categories={categories} onCategorySelect={setSelectedCategory} />
      <ItemsGrid items={items} category={selectedCategory} onItemsChanged={refetch} />
    </>
  );
};

export default Donate;
