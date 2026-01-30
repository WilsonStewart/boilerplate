import type { Context } from "hono";
import { css } from "hono/css";

export const HMainContainer = (c: Context) => {
  const headerClass = css`
    background-color: orange;
    color: white;
    padding: 1rem;
  `;

  return c.html(
    <>
      <link rel="stylesheet" href="/styles.css" />
      <div class={headerClass}>
        <h1>Sysadmin Tools</h1>
      </div>
    </>,
  );
};
