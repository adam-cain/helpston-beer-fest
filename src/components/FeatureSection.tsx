import { ReactNode } from "react";
import CTAButton from "./CTAButton";
import classNames from "classnames";

interface FeatureSectionProps {
  subTitle: string;
  title: string;
  description: ReactNode;
  ctaText: string;
  link: string;
  visualElement?: ReactNode; // Optional visual content
  reverse?: boolean; // Reverses layout order if true
}

export default function FeatureSection({
  subTitle,
  title,
  description,
  ctaText,
  link,
  visualElement,
  reverse = false,
}: FeatureSectionProps) {
  return (
    <div className={classNames(!reverse && "bg-white size-full text-black")}>
      <div className="container mx-auto px-4 py-12 lg:px-32 xl:px-48">
        {/* Dynamic grid layout based on whether visualElement exists */}
        <div
          className={`grid gap-10 items-start ${visualElement ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"
            }`}
        >
          {reverse ? (
            <>
              {/* Visual Content first when reversed, only if visualElement exists */}
              <ColumnVisualElement visualElement={visualElement} />

              {/* Text Content */}
              <div className="flex flex-col gap-5">
                <p className="text-sm font-mono tracking-tight">{subTitle}</p>
                <h3 className="text-4xl lg:text-5xl text-balance">{title}</h3>
                <TextVisualElement
                  visualElement={visualElement}
                />
                <div className="text-[clamp(1rem,0.442vw+0.896rem,1.25rem)] leading-[clamp(1.125rem,0.331vw+1.047rem,1.313rem)] tracking-[-0.02em] font-sans text-balance">
                  {description}
                </div>
                <div>
                  <CTAButton href={link} reverse={reverse}>{ctaText}</CTAButton>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Text Content first if NOT reversed */}
              <div className="flex flex-col gap-5">
                <p className="text-sm font-mono tracking-tight">{subTitle}</p>
                <h3 className="text-4xl lg:text-5xl text-balance">{title}</h3>
                <TextVisualElement
                  visualElement={visualElement}
                />
                <div className="text-[clamp(1rem,0.442vw+0.896rem,1.25rem)] leading-[clamp(1.125rem,0.331vw+1.047rem,1.313rem)] tracking-[-0.02em] font-sans text-balance">
                  {description}
                </div>
                <div>
                  <CTAButton href={link} reverse={reverse}>{ctaText}</CTAButton>
                </div>
              </div>

              {/* Visual Content second, only if visualElement exists */}
              <ColumnVisualElement visualElement={visualElement} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const TextVisualElement = ({
  visualElement,
  className,
}: {
  visualElement?: ReactNode;
  className?: string;
}) => {
  return (
    <VisualElement
    visualElement={visualElement}
    className={classNames("block sm:hidden",className)}
  />
  )
}

const ColumnVisualElement = ({
  visualElement,
  className,
}: {
  visualElement?: ReactNode;
  className?: string;
}) => {
  return (
    <VisualElement
    visualElement={visualElement}
    className={classNames("hidden sm:block",className)}
  />
  )
}


const VisualElement = ({
  visualElement,
  className,
}: {
  visualElement?: ReactNode;
  className?: string;
}) => {
  return (
    visualElement ? (
      <div className={classNames('size-full flex items-center justify-center overflow-hidden m-auto', className)}>
        {visualElement}
      </div>
    ) : null
  );
};