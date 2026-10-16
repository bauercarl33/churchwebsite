import { TbBrandCashapp, TbBrandPaypal } from "react-icons/tb";
import { SiGofundme, SiZelle } from "react-icons/si";
import { BiLogoVenmo } from "react-icons/bi";

import { s3Image } from "../lib/api";

// Single source of truth for the payment methods shown on the Donate page
// and in the donation-item modal.

export const TITHELY_LINK =
  "https://give.tithe.ly/?formId=e10072ba-83d2-456a-99c7-dad8b23177f0";
export const TITHELY_IMAGE = s3Image("1BkJiqWi-0Qf4fzECI23QfyJT2U3uIUGm");
export const TITHELY_IMAGE_SIZE = [1858, 512];

export const ZELLE_LINK =
  "https://enroll.zellepay.com/qr-codes/?data=eyJuYW1lIjoiU0FJTlQgTUFSWSBST01BTklBTiBPUlRIT0RPWCBDSFVSQ0giLCJ0b2tlbiI6ImNodXJjaEBzYWludG1hcnlhdXN0aW4ub3JnIiwiYWN0aW9uIjoicGF5bWVudCJ9=";

export const paymentOptions = {
  cashapp: {
    label: "Cashapp",
    icon: <TbBrandCashapp />,
    qr: s3Image("1T8rzdYXFTvXYVT16NtwFxBLCbDGMjdE2"),
    // Intrinsic size of the QR image, used to reserve space before it loads.
    qrSize: [957, 1035],
    link: "https://cash.app/$saintmaryorthodox?qr=1",
  },
  venmo: {
    label: "Venmo",
    icon: <BiLogoVenmo />,
    qr: s3Image("1a15SPoeT62u9xoY6-D7xxqcxCkggTUow"),
    qrSize: [512, 426],
    link: "https://venmo.com/code?user_id=3093467274149888897&created=1645489089",
  },
  paypal: {
    label: "Paypal",
    icon: <TbBrandPaypal />,
    qr: s3Image("16ayX3AeW9dFMMmopqE4SqNxraGqhi5Rh"),
    qrSize: [496, 496],
    link: "https://www.paypal.com/qrcodes/managed/106342a1-8b31-43e1-830f-e8cdbe334363?utm_source=hawk_quick_link",
  },
  gofundme: {
    label: "Gofundme",
    icon: <SiGofundme />,
    qr: s3Image("1BgtiL3oU34seQLd8tFM_0rgBSQhheibE"),
    qrSize: [244, 247],
    link: "https://gofund.me/a683342f",
  },
  zelle: {
    label: "Zelle",
    icon: <SiZelle />,
    qr: s3Image("1r-0cm1EinX-sEZTS6bdk227yE_U1ucPQ"),
    qrSize: [881, 1084],
    link: ZELLE_LINK,
  },
};
