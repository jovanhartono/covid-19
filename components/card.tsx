import {CardSection, Card} from "../interfaces/general";
import * as React from "react";

interface CardProps {
    section: CardSection
}

function Cards({section}: CardProps) {
    return (
        <div className="not-prose w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5 xl:gap-7 mt-3">
            {section.datas.map((card: Card, index: number) => {
                return (
                    <div key={index} className="rounded-lg p-3 transition-all duration-200 ease-in-out shadow-lg
                    hover:shadow-xl hover:-translate-y-0.5">
                        <card.icon className={`w-6 h-6 ${card.iconColor}`}/>
                        <span className="text-xl text-gray-900 font-semibold">{card.value}</span>
                        <p className="font-light text-sm">{card.title}</p>
                    </div>
                )
            })}
        </div>
    );
}

export default Cards;