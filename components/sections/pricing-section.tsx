"use client"

import { cn } from "@/lib/utils"

const pricingPlans = [
  {
    title: "MONTHLY MEMBERSHIP",
    price: "14 €",
    originalPrice: "",
    period: " / month",
    yearlyPrice: "",
    description: "Perfect for beginners who want to explore our platform and test the waters before making a long-term commitment.",
    isPopular: false,
},
{
    title: "LIFETIME MEMBERSHIP",
    price: "48 €",
    originalPrice: "",
    period: "",
    monthlyPrice: "",
    description: "Our best value option for those committed to building a career in coding. Includes all future updates with no recurring fees.",
    savings: "Save over 120€ compared to 1 year of monthly payments",
    isPopular: true,
},

  {
    title: "UNIVERSITY",
    price: "10 000 €",
    period: " / year",
    source: "",
    description: "While official degrees remain valuable, many employers now place greater emphasis on practical experience and demonstrated knowledge when hiring candidates.",
    isPopular: false,
  },
]

export default function PricingSection() {
  return (
    <div className="w-full overflow-hidden">
      <div className="text-center mb-10 sm:mb-14">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">Join the hive!</h2>
        <p className="text-gray-400 text-base sm:text-lg px-4">
          Invest in your career and become a zerg developer
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto px-4">
        {pricingPlans.map((plan, index) => (
          <div
            key={plan.title}
            className={cn(
              "relative rounded-lg p-6 sm:p-8 border border-[#1E2D3D] ",
              plan.isPopular && "border-[#00a2ff]"
            )}
          >
            {plan.isPopular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00a2ff] text-black px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
            )}
            <div className="text-center mb-6 sm:mb-8">
              <h3 className="text-gray-400 text-sm font-medium mb-4 sm:mb-6">{plan.title}</h3>
              <div className="mb-1">
                {plan.originalPrice && (
                  <span className="text-gray-500 line-through text-sm mr-2">{plan.originalPrice}</span>
                )}
                <span className="text-3xl sm:text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-gray-400 text-sm">{plan.period}</span>
              </div>
              {plan.monthlyPrice && (
                <div className="text-gray-400 text-sm">{plan.monthlyPrice}</div>
              )}
              {plan.yearlyPrice && (
                <div className="text-gray-400 text-sm">{plan.yearlyPrice}</div>
              )}
            </div>
            <div className="text-gray-300 text-center text-sm sm:text-base mb-6">{plan.description}</div>
            {plan.savings && (
              <div className="text-[#00FFAA] text-xs sm:text-sm text-center italic">{plan.savings}</div>
            )}
            {plan.source && (
              <div className="text-gray-500 text-xs sm:text-sm text-center mt-2">{plan.source}</div>
            )}
          </div>
        ))}
      </div>

      <div className="text-center mt-8 sm:mt-10">
        <button className="mt-4 sm:mt-8 bg-[#00a2ff] text-black font-medium px-6 sm:px-8 py-2.5 sm:py-3 rounded-full hover:opacity-90 transition-opacity cursor-pointer">
          Get Started
        </button>
      </div>
    </div>
  )
} 