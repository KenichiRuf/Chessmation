import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PremiumCTAProps {
  title?: string;
  description?: string;
  price?: string;
  buttonText?: string;
  buttonLink?: string;
  className?: string;
}

export function PremiumCTA({
  title = "Premium Animations",
  description = "Unlock premium animations for your favorite openings for just",
  price = "$2.99",
  buttonText = "Learn More About Premium",
  buttonLink = "/premium",
  className = "",
}: PremiumCTAProps) {
  return (
    <div className={`bg-[#272727] text-white p-6 text-center ${className}`}>
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-lg text-gray-300 mt-4 max-w-2xl mx-auto">
        {description} <span className="text-[#99BC59] font-semibold">{price}</span>.
      </p>
      <Link href={buttonLink}>
        <Button className="mt-6 bg-[#99BC59] hover:bg-[#8CAF4D] text-white text-lg rounded-lg">
          {buttonText}
        </Button>
      </Link>
    </div>
  );
}