const CLOUDINARY_REGEX =
  /^.+\.cloudinary\.com\/(?:[^/]+\/)(?:(image|video|raw)\/)?(?:(upload|fetch|private|authenticated|sprite|facebook|twitter|youtube|vimeo)\/)?(?:(?:[^_/]+_[^,/]+,?)*\/)?(?:v(\d+|\w{1,2})\/)?([^.^\s]+)(?:\.(.+))?$/

const extractPublicId = (link: string): string => {
  if (!link) return ''

  const parts = CLOUDINARY_REGEX.exec(link)

  return parts && parts.length > 2 ? parts[parts.length - 2] : link
}

export default extractPublicId
