import React, { useEffect, useRef, useState } from "react";

import { TbBrandCashapp, TbBrandPaypal } from "react-icons/tb";
import { SiGofundme } from "react-icons/si";
import { BiLogoVenmo } from "react-icons/bi";
import { SiZelle } from "react-icons/si";

import "./donate.css";

const cashapp =
  "https://saintmarychurch.s3.us-east-1.amazonaws.com/images/cashappqrcode.jpeg";
const venmo =
  "https://saintmarychurch.s3.us-east-1.amazonaws.com/images/1a15SPoeT62u9xoY6-D7xxqcxCkggTUow";
const paypal =
  "https://saintmarychurch.s3.us-east-1.amazonaws.com/images/16ayX3AeW9dFMMmopqE4SqNxraGqhi5Rh";
const gofundme =
  "https://saintmarychurch.s3.us-east-1.amazonaws.com/images/1BgtiL3oU34seQLd8tFM_0rgBSQhheibE";
const zelle =
  "https://saintmarychurch.s3.us-east-1.amazonaws.com/images/Screenshot+2025-09-01+at+2.54.16%E2%80%AFPM.png";
const tihely =
  "https://saintmarychurch.s3.us-east-1.amazonaws.com/images/1BkJiqWi-0Qf4fzECI23QfyJT2U3uIUGm";

const tithelyLink =
  "https://give.tithe.ly/?formId=e10072ba-83d2-456a-99c7-dad8b23177f0";

const Donate = () => {
  const options = {
    cashapp: {
      icon: <TbBrandCashapp />,
      qr: cashapp,
      link: "https://cash.app/$saintmaryorthodox?qr=1",
    },
    venmo: {
      icon: <BiLogoVenmo />,
      qr: venmo,
      link: "https://venmo.com/code?user_id=3093467274149888897&created=1645489089",
    },
    paypal: {
      icon: <TbBrandPaypal />,
      qr: paypal,
      link: "https://www.paypal.com/qrcodes/managed/106342a1-8b31-43e1-830f-e8cdbe334363?utm_source=hawk_quick_link",
    },
    gofundme: {
      icon: <SiGofundme />,
      qr: gofundme,
      link: "https://gofund.me/a683342f",
    },
    zelle: {
      icon: <SiZelle />,
      qr: zelle,
      link: "https://enroll.zellepay.com/qr-codes/?data=eyJuYW1lIjoiU0FJTlQgTUFSWSBST01BTklBTiBPUlRIT0RPWCBDSFVSQ0giLCJ0b2tlbiI6ImNodXJjaEBzYWludG1hcnlhdXN0aW4ub3JnIiwiYWN0aW9uIjoicGF5bWVudCJ9=",
    },
  };

  const [donationOption, setDonationOption] = useState("cashapp");
  const [donationpillStyle, setdonationpillStyle] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const selectorRef = useRef(null);

  const handleDonation = (option) => {
    setDonationOption(option);
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      const activeElement =
        selectorRef.current?.querySelector(".item.selected");
      if (activeElement) {
        updatePillPosition(activeElement);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const activeElement = selectorRef.current?.querySelector(".item.selected");
    if (activeElement) {
      updatePillPosition(activeElement);
    }
  }, [donationOption]);

  const updatePillPosition = (element) => {
    const rect = element.getBoundingClientRect();
    const selectedRect = selectorRef.current.getBoundingClientRect();
    setdonationpillStyle({
      top: rect.top - selectedRect.top - 1,
      left: rect.left - selectedRect.left,
      width: rect.width - 2,
      height: rect.height,
    });
  };

  return (
    <div className="donate">
      {/* <div className='col'>
        <div className='text'>
          <h4>We Need Your Help!</h4>
          <p>St. Mary Orthodox Church is currently building a new church to be able to support our growing community for generations. We greatly appreciate your kindness and generosity to keep us able to grow and maintain our church.</p>
          <p>Provided are multiple ways to donate so you can give in the way you are most comfortable. Either click on the tithe.ly link, or scan/click one of the provided QR codes to give through CashApp, Venmo, PayPal, GoFundMe, or Zelle.</p>
        </div>
      </div> */}
      <div className="col">
        <a href={tithelyLink} target="_blank" className="tithely">
          <p>Click here to donate with Tithely.</p>
          <img src={tihely} alt="tithely link image" />
        </a>
        <div className="divider">
          <h5>Or</h5>
        </div>
        <p>Select a QR code and scan/click the link.</p>
        <div className="qrs">
          <div className="selector" ref={selectorRef}>
            <div className="donationpill" style={donationpillStyle} />
            {Object.entries(options).map(([key, value]) => {
              return (
                <button
                  className={donationOption === key ? "item selected" : "item"}
                  key={key}
                  onClick={() => handleDonation(key)}
                >
                  {value.icon}
                </button>
              );
            })}
          </div>
          {Object.entries(options).map(([key, value]) => {
            return (
              <a
                href={value.link}
                target="_blank"
                className={donationOption === key ? "qr selected" : "qr"}
                key={`${key}_qr`}
              >
                <img src={value.qr} alt={`${key} qr code`} />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Donate;
