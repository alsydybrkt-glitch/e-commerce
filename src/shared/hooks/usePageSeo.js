import { useEffect } from "react";
import { setDocumentMetadata } from "../lib/seo";

export function usePageSeo(metadata) {
  useEffect(() => {
    setDocumentMetadata(metadata);
  }, [metadata]);
}
