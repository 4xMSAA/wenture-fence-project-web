export const metadata = {
  title: "fences",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{margin: 0}}>{children}</body>
    </html>
  );
}
