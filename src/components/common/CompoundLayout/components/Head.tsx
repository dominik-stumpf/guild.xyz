import NextHead from "next/head"

interface Props {
  ogTitle?: string
  ogDescription?: string
  imageUrl?: string
  title?: string
}

const Head = ({ ogTitle, ogDescription, title, imageUrl }: Props) => (
  <NextHead>
    <title>{`${ogTitle ?? title}`}</title>
    <meta property="og:title" content={`${ogTitle ?? title}`} />
    <link rel="shortcut icon" href={imageUrl ?? "/guild-icon.png"} />
    {ogDescription && (
      <>
        <meta name="description" content={ogDescription} />
        <meta property="og:description" content={ogDescription} />
      </>
    )}
  </NextHead>
)

export default Head
