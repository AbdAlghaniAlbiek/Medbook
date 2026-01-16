import StackPanel from "@/components/ui/stack-panel";
import AuthHeader from "../_layouts/auth-header";
import PageContent from "@/components/content/content";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AuthHeader />
      <PageContent>{children}</PageContent>
    </div>
  );
}
