"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import "yet-another-react-lightbox/styles.css";

interface ProjectProps {
  images: string[];
  title: string;
  subtitle?: string;
  text: string;
  type: string;
}

interface GalleryImage {
  src: string;
  originalIndex: number;
}

export default function ProjectDetailClient({
  images,
  title,
  subtitle,
  text,
  type,
}: ProjectProps) {
  const [open, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const imageCount = images?.length ?? 0;

  const hasOddNumberOfImages =
    imageCount > 0 && imageCount % 2 !== 0;

  const slides = images.map((src) => ({
    src,
  }));

  const indexedImages: GalleryImage[] = images.map(
    (src, originalIndex) => ({
      src,
      originalIndex,
    }),
  );

  /*
   * Para quantidades pares, divide as imagens em grupos de três:
   *
   * grupo 1: uma destacada + duas lado a lado
   * grupo 2: uma destacada + duas lado a lado
   */
  const evenGroups: GalleryImage[][] = [];

  if (!hasOddNumberOfImages) {
    for (let index = 0; index < indexedImages.length; index += 3) {
      evenGroups.push(indexedImages.slice(index, index + 3));
    }
  }

  const oddGalleryImages = hasOddNumberOfImages
    ? indexedImages.slice(1)
    : [];

  const openLightbox = (index: number) => {
    setPhotoIndex(index);
    setOpen(true);
  };

  const renderImage = (
    image: GalleryImage,
    className?: string,
  ) => (
    <img
      key={`${image.src}-${image.originalIndex}`}
      className={className}
      src={image.src}
      alt={`${title} - imagem ${image.originalIndex + 1}`}
      onClick={() => openLightbox(image.originalIndex)}
      style={{ cursor: "pointer" }}
    />
  );

  return (
    <>
      <div className="project-detail">
        <div className="project-gallery">
          {/* Quantidade ímpar */}
          {hasOddNumberOfImages && (
            <>
              <div className="hero-image">
                {renderImage(indexedImages[0])}
              </div>

              {oddGalleryImages.length > 0 && (
                <div className="gallery-grid">
                  {oddGalleryImages.map((image) =>
                    renderImage(image),
                  )}
                </div>
              )}
            </>
          )}

          {/* Quantidade par */}
          {!hasOddNumberOfImages &&
            evenGroups.map((group, groupIndex) => {
              const featuredImage = group[0];
              const sideBySideImages = group.slice(1);

              return (
                <div
                  className="gallery-group"
                  key={`gallery-group-${groupIndex}`}
                >
                  <div className="hero-image">
                    {renderImage(featuredImage)}
                  </div>

                  {sideBySideImages.length > 0 && (
                    <div className="gallery-grid">
                      {sideBySideImages.map((image) =>
                        renderImage(image),
                      )}
                    </div>
                  )}
                </div>
              );
            })}
        </div>

        <aside className="project-info">
          <p className="eyebrow">{type}</p>

          <h1 className="project-title">
            {title}
          </h1>

          {subtitle && (
            <h2 className="project-subtitle">
              {subtitle}
            </h2>
          )}

          <p className="project-text">
            {text}
          </p>
        </aside>
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={photoIndex}
        slides={slides}
        plugins={[Zoom]}
        zoom={{
          maxZoomPixelRatio: 3,
        }}
        styles={{
          container: {
            backgroundColor: "rgba(0,0,0,.92)",
          },
        }}
      />
    </>
  );
}