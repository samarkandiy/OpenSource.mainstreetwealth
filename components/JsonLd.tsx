import * as React from "react";

type JsonLdProps = {
  /** A fully-formed @graph document (or a single node). Will be stringified. */
  data: object | string;
  /** Deterministic id so React can dedupe when the same schema renders twice. */
  id?: string;
};

/**
 * Renders a schema.org JSON-LD <script> tag. Server-component safe.
 * Pre-stringify via lib/schema.composeGraph to minify output.
 */
export function JsonLd({ data, id }: JsonLdProps) {
  const json = typeof data === "string" ? data : JSON.stringify(data);
  return (
    <script
      type="application/ld+json"
      id={id}
      // JSON-LD is content, not markup. Next sanitizes HTML in strings but we need raw JSON.
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
