import React from "react";

interface IPageContent {
  children: any;
}
function PageContent({ children }: IPageContent) {
  return (
    <div className="relative min-h-screen bg-gray-100 p-4">{children}</div>
  );
}

export default PageContent;
