export const metadata = {
  title: 'المشروع الجديد',
  description: '...',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar">
      <body>{children}</body>
    </html>
  )
}
