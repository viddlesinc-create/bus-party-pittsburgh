interface ComparisonTableProps {
  /** Names the table for screen readers and for extraction. Should mention the business and city. */
  caption: string;
  columns: string[];
  rows: (string | number)[][];
  className?: string;
}

/**
 * A real <table>, not a grid of divs.
 *
 * The site previously had zero <table> elements. Assistants and answer engines
 * lift tabular facts far more reliably out of real table markup than out of
 * styled divs, and a <caption> plus scoped headers is also what makes the same
 * content usable with a screen reader.
 *
 * Rows are passed in from whatever data the page already renders, so a table
 * never introduces a number that isn't already on the page.
 */
export function ComparisonTable({ caption, columns, rows, className = "" }: ComparisonTableProps) {
  return (
    // Wide tables scroll inside their own container rather than pushing the page.
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full text-sm border-collapse">
        <caption className="text-left text-muted-foreground mb-3 caption-top">
          {caption}
        </caption>
        <thead>
          <tr className="border-b-2 border-border">
            {columns.map((c) => (
              <th key={c} scope="col" className="text-left font-semibold py-3 px-3 whitespace-nowrap">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border/60">
              {row.map((cell, j) =>
                j === 0 ? (
                  <th key={j} scope="row" className="text-left font-medium py-3 px-3 align-top">
                    {cell}
                  </th>
                ) : (
                  <td key={j} className="py-3 px-3 align-top text-muted-foreground">
                    {cell}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
