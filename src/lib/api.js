// Central list of the backend endpoints (AWS API Gateway) and S3 asset base
// used by the site, plus a small fetch helper that surfaces HTTP errors.

export const S3_IMAGE_BASE = "https://saintmarychurch.s3.us-east-1.amazonaws.com/images/";

export const s3Image = (id) => `${S3_IMAGE_BASE}${id}`;

export const endpoints = {
  calendar:
    "https://ritymdmzg4.execute-api.us-east-1.amazonaws.com/prod/getChurchCalendar",
  mediaFolders:
    "https://uju8i8tktb.execute-api.us-east-1.amazonaws.com/prod/listFoldersInGoogleDrive",
  mediaFolderFiles: (folderId) =>
    `https://5as4ejxxn4.execute-api.us-east-1.amazonaws.com/prod/listFileIdsInFolder/${folderId}`,
  donationItems:
    "https://7pqvzdqk37.execute-api.us-east-1.amazonaws.com/prod/getDonationItems",
  putDonationItem:
    "https://2wtfo19jwf.execute-api.us-east-1.amazonaws.com/prod/putDonationItem",
  sendEmail: "https://fbe91qmgz7.execute-api.us-east-1.amazonaws.com/prod",
};

/**
 * fetch() wrapper that sends/accepts JSON and throws on non-2xx responses,
 * so react-query (or the caller) can treat them as errors.
 */
export async function fetchJson(url, { method = "GET", body } = {}) {
  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
}
