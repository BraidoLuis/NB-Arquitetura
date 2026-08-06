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

export default function ProjectDetailClient({
  images,
  title,
  subtitle,
  text,
  type,
}: ProjectProps) {
  const [open, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const imageCount = images?.length || 0;
  const hasFive = imageCount === 5;
  const slides = images?.map((src) => ({ src })) ?? [];

  const openLightbox = (index: number) => {
    setPhotoIndex(index);
    setOpen(true);
  };

  return (
    <>
      <div className="project-detail">
        <div className="project-gallery">
          {hasFive && (
            <div className="hero-image" onClick={() => openLightbox(0)}>
              <img src={images[0]} alt={title} style={{ cursor: "pointer" }} />
            </div>
          )}
          <div className={`gallery-grid ${hasFive ? "four" : "four"}`}>
            {(hasFive ? images.slice(1) : images).map((src, idx) => {
              const actualIndex = hasFive ? idx + 1 : idx;
              return (
                <img
                  key={idx}
                  src={src}
                  alt={`${title} - imagem ${actualIndex + 1}`}
                  onClick={() => openLightbox(actualIndex)}
                  style={{ cursor: "pointer" }}
                />
              );
            })}
          </div>
        </div>

        <aside className="project-info">
          <p className="eyebrow">{type}</p>
          <h1 className="project-title">{title}</h1>
          {subtitle && <h2 className="project-subtitle">{subtitle}</h2>}
          <p className="project-text">{text}</p>
        </aside>
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={photoIndex}
        slides={slides}
        plugins={[Zoom]}
        zoom={{ maxZoomPixelRatio: 3 }}
        styles={{ container: { backgroundColor: "rgba(0,0,0,.92)" } }}
      />
    </>
  );
}