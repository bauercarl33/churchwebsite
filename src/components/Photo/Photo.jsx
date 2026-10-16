import { photos } from "../../images/photos";

/**
 * Responsive <img> for a generated site photo (see src/images/photos.js).
 *
 * Width/height attributes are only added with `withDimensions`: most photos
 * are sized by CSS `width` + `aspect-ratio`, where a `height` attribute would
 * act as a CSS height and override the aspect ratio. Use it when the CSS sets
 * both width and height (so the attributes only supply the aspect ratio and
 * the browser can reserve space before the image loads, avoiding layout
 * shift).
 */
const Photo = ({ name, alt, sizes, loading = "lazy", withDimensions = false, ...rest }) => {
  const photo = photos[name];
  if (!photo) throw new Error(`Unknown photo "${name}" (see src/images/photos/manifest.json)`);
  return (
    <img
      src={photo.src}
      srcSet={photo.srcSet}
      sizes={sizes}
      width={withDimensions ? photo.width : undefined}
      height={withDimensions ? photo.height : undefined}
      alt={alt}
      loading={loading}
      decoding="async"
      {...rest}
    />
  );
};

export default Photo;
