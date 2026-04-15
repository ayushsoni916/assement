export const findBestCars = (query, carList) => {
    if (!query) return [];

    const input = query.toLowerCase();

    const intent = {
        isFamily: /kids|children|family|parents/i.test(input),
        isBudget: /budget|cheap|low price|affordable|value/i.test(input),
        isMileage: /mileage|fuel|average|petrol|efficient|range/i.test(input),
        isSafety: /safety|safe|sturdy|crash/i.test(input),
        isPerformance: /fast|powerful|engine|speed/i.test(input),
    };

    const scoredCars = carList.map(car => {
        let score = 0;
        let matchReasons = [];
        let breakdown = { family: 0, budget: 0, mileage: 0, safety: 0, tags: 0 };

        // 1. FAMILY LOGIC
        if (intent.isFamily) {
            if (car.seats >= 7) breakdown.family += 50;
            if (car.safety >= 4) breakdown.family += 30;
            if (breakdown.family > 0) matchReasons.push("Spacious for family");
            score += breakdown.family;
        }

        // 2. UPDATED BUDGET LOGIC (Stronger Penalty for high prices)
        if (intent.isBudget) {
            if (car.price < 1000000) {
                breakdown.budget += 100; // Big bonus for sub-10L
                matchReasons.push("Budget-friendly");
            } else if (car.price > 2000000) {
                breakdown.budget -= 300; // Hard penalty for luxury in a budget search
            } else {
                breakdown.budget -= 50;  // Moderate penalty for mid-range
            }
            // Linear penalty: -5 points for every 1 Lakh price
            breakdown.budget -= Math.round(car.price / 100000) * 5;
            score += breakdown.budget;
        }

        // 3. UPDATED MILEAGE LOGIC (Normalization for EVs)
        if (intent.isMileage) {
            // Normalize EV Range to a Petrol-equivalent scale (e.g., 500km range / 20 = 25 "score units")
            const normalizedMileage = car.type === 'EV' ? car.mileage / 20 : car.mileage;
            breakdown.mileage = Math.round(normalizedMileage * 4); // Weight of 4
            
            if (car.mileage > 20 || (car.type === 'EV' && car.mileage > 300)) {
                matchReasons.push("High fuel efficiency");
            }
            score += breakdown.mileage;
        }

        // 4. SAFETY LOGIC
        if (intent.isSafety) {
            breakdown.safety = car.safety * 15;
            if (car.safety >= 5) matchReasons.push("Top-tier safety");
            score += breakdown.safety;
        }

        // 5. TAG MATCHING
        car.tags.forEach(tag => {
            if (input.includes(tag.toLowerCase())) {
                breakdown.tags += 25;
                score += 25;
                matchReasons.push(`Matches ${tag}`);
            }
        });

        return {
            ...car,
            score,
            breakdown,
            matchReasons: [...new Set(matchReasons)].slice(0, 2)
        };
    });

    const finalResults = scoredCars
        .sort((a, b) => b.score - a.score)
        .slice(0, 3); // Top 3

    // 2. Log the Scoring Table
    // console.log("📊 Intent Detected:", intent);
    // console.log("📊 Match Scoring Breakdown (Top Results):");
    // console.table(finalResults.map(c => ({
    //     Car: `${c.make} ${c.model}`,
    //     Price: `₹${(c.price / 100000).toFixed(1)}L`,
    //     Total: c.score,
    //     ...c.breakdown
    // })));

    return finalResults;
};