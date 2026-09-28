interface CollectionLaunchEmailParams {
  collectionName: string
  description: string
  coverImage: string
  slug: string
}

export function getCollectionLaunchEmailHtml({
  collectionName,
  description,
  coverImage,
  slug,
}: CollectionLaunchEmailParams): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mulaan.lk'
  const collectionUrl = `${siteUrl}/collections/${slug}`

  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body style="margin:0; padding:0; background-color:#f5f1e8; font-family: Georgia, 'Times New Roman', serif;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f1e8; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" style="max-width: 560px; background-color:#ffffff;">

              <!-- Header -->
              <tr>
                <td style="background-color:#1a3d3d; padding: 40px 40px 24px; text-align:center;">
                  <p style="margin:0; color:#c9b896; font-size:10px; letter-spacing:6px; text-transform:uppercase; font-family: Arial, sans-serif;">
                    New Collection
                  </p>
                </td>
              </tr>

              <!-- Cover Image -->
              <tr>
                <td>
                  <img src="${coverImage}" alt="${collectionName}" width="560" style="display:block; width:100%; height:auto;" />
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding: 40px 40px 32px; text-align:center;">
                  <h1 style="margin:0 0 16px; color:#1a3d3d; font-size:28px; letter-spacing:3px; text-transform:uppercase; font-style: italic; font-weight: normal;">
                    ${collectionName}
                  </h1>
                  <p style="margin:0 0 32px; color:#4a4a4a; font-size:15px; line-height:1.8; font-family: Arial, sans-serif;">
                    ${description}
                  </p>

                  <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                    <tr>
                      <td style="background-color:#1a3d3d; padding: 16px 40px;">
                        <a href="${collectionUrl}" style="color:#c9b896; text-decoration:none; font-size:11px; letter-spacing:3px; text-transform:uppercase; font-family: Arial, sans-serif;">
                          Explore the Collection
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding: 24px 40px; border-top: 1px solid #eee; text-align:center;">
                  <p style="margin:0; color:#999; font-size:10px; letter-spacing:2px; text-transform:uppercase; font-family: Arial, sans-serif;">
                    © ${new Date().getFullYear()} Mulaan Studios
                  </p>
                  <p style="margin:8px 0 0; color:#bbb; font-size:10px; font-family: Arial, sans-serif;">
                    You're receiving this because you subscribed at mulaan.lk
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `
}