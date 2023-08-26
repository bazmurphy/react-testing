import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";
import "./Page.css";

// how to import a file as raw (but not dynamic)
// import markdownContent from "./markdown/19.md?raw";
// console.log(markdownContent);

export const Page = ({ pageNumber }: { pageNumber: number }) => {
  const [markdownContent, setMarkdownContent] = useState("");

  import(`./assets/markdown/${pageNumber.toString().padStart(2, "0")}.md`).then(
    (res) => {
      fetch(res.default)
        .then((response) => response.text())
        .then((text) => setMarkdownContent(text));
    }
  );

  /**
   * Avoids an issue where two `pre` tags appear nested on rendered Markdown
   * because `react-markdown` adds a `pre` tag by default and
   * `react-syntax-highlighter` requires it's own `pre` tag to also be rendered.
   *
   * This `CustomPreTag` component is used to replace the
   * `react-syntax-highlighter` `pre` tag by an empty element, with just the
   * nested `code` element as children. This way only the `react-markdown`
   * `pre` tag is rendered.
   */
  const CustomPreTag = ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  );

  return (
    <div className="page">
      <ReactMarkdown
        children={markdownContent}
        components={{
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                style={vscDarkPlus}
                language={match[1]}
                PreTag={CustomPreTag} // Use the component here
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
    </div>
  );
};
