import { checkoutAction } from '@/lib/payments/actions';
import { Info, Check } from 'lucide-react';
import { SubmitButton } from './submit-button';
import { AnimationSlider } from '@/components/AnimationSlider';

// Prices are fresh for one hour max
export const revalidate = 3600;

interface Feature {
  text: string;
  tooltip?: string;
}

export default async function PricingPage() {
  const baseFeatures: Feature[] = [
    { 
      text: '5 Default Openings',
      tooltip: 'The London<br />The French<br />The Ruy Lopez<br />The Scandinavian<br />The Queen\'s Gambit'
    },
    { text: '1 Default Animation per Opening' },
    { text: '1 Default Voice Line per Opening' },
  ];

  const premiumFeatures: Feature[] = [
    { text: 'All Default Openings & Animations' },
    { text: 'Alternate Voice Lines' },
    {
      text: 'Animations & Voice Lines for Premium Openings',
      tooltip: 'The Alien Gambit<br />The Hippo<br />The Cow<br />The Bongcloud<br />The Fried Liver'
    },
  ];

  const animations = [
    { id: 1, name: "Alien Gambit", image: "/assets/alien.png" },
    { id: 2, name: "The Hippo", image: "/assets/hippo.png" },
    { id: 3, name: "The Fried Liver", image: "/assets/liver.png" },
    { id: 4, name: "The Cow", image: "/assets/cow.png" },
    { id: 5, name: "Bong Cloud", image: "/assets/bongcloud.png" },
  ]

  return (
    <main className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-[#272727] text-white text-center">
      <h1 className="text-4xl font-bold mb-8 text-[#99BC59]">Choose Your Plan</h1>
      <div className="grid md:grid-cols-2 gap-8 max-w-xl mx-auto mb-8">
        <PricingCard
          name="Basic"
          price={0}
          features={baseFeatures}
          priceId="price_1QvmF1C50NlhlYOfGQ0DVNxZ"
        />
        <PricingCard
          name="Premium"
          price={499} // Represented in cents ($4.99)
          features={premiumFeatures}
          priceId="price_1QvmESC50NlhlYOfSNVeyI8y" 
        />
      </div>
      <AnimationSlider animations={animations} title="Sneak Peak:"/>
    </main>
  );
}

function PricingCard({
  name,
  price,
  features,
  priceId,
}: {
  name: string;
  price: number;
  features: Feature[];
  priceId?: string;
}) {
  return (
    <div className="pt-6 bg-[#1e1e1e] p-6 rounded-lg shadow-lg border border-[#99BC59] flex flex-col h-full">
      <h2 className="text-2xl font-medium text-[#99BC59] mb-2">{name}</h2>
      <p className="text-4xl font-medium text-white mb-6">
        {price === 0 ? 'Free' : `$${(price / 100).toFixed(2)}`}
      </p>
      <ul className="space-y-4 text-left">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-[#99BC59] mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-gray-300 flex items-center">
              {feature.text}
              {feature.tooltip && (
                <div className="relative group ml-2">
                  <Info className="h-4 w-4 text-[#99BC59] cursor-pointer group-hover:text-white transition-colors" />
                  <span
                    className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-[#1e1e1e] text-white text-sm p-2 rounded-lg border border-[#99BC59] shadow-lg z-10 transition-opacity duration-200"
                    dangerouslySetInnerHTML={{ __html: feature.tooltip }}
                  />
                </div>
              )}
            </span>
          </li>
        ))}
      </ul>
      {priceId && (
        <form action={checkoutAction} className="mt-auto pt-6">
          <input type="hidden" name="priceId" value={priceId} />
          <SubmitButton />
        </form>
      )}
    </div>
  );
}
