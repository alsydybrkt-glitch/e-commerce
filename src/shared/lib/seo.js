export function setDocumentMetadata({ title, description }) {
  if (typeof document === "undefined") {
    return;
  }

  if (title) {
    document.title = title;
  }

  if (description) {
    let metaDescription = document.querySelector('meta[name="description"]');

    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }

    metaDescription.setAttribute("content", description);
  }
}
