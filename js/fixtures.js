

let fixtures = {

    getWearableItemTypes: function () {
        return [
            1, // Necklaces
            9, // Rings
            10, // Belts
            11, // Boots
            16, // Hats
            17, // Cape
        ];
    },

    getEffects: function() {
        return {
            'PA': 111,
            'Damage': 112,
            'Critics %': 115,
            'Range': 117,

            'Strength': 118,
            'Agility': 119,
            'Luck': 123,
            'Wisdom': 124,
            'Vitality': 125,
            'Intel': 126,

            'PM': 128,
            'Power': 138,
            'EscapePA': 160,
            'EscapePM': 161,
            'Initiative': 174,
            'Prospection': 176,
            'Heal': 178,
            'Invocations': 182,

            'StrengthRes': 210,
            'LuckRes': 211,
            'AgileRes': 212,
            'IntelRes': 213,
            'NeutralRes': 214,
            'PAremoval': 410,
            'PMremoval': 412,
            'CriticRes': 420,

            'StrengthDamage': 422,
            'IntelDamage': 424,
            'LuckDamage': 426,
            'AgileDamage': 428,
            'NeutralDamage': 430,

            'Escape': 752,
            'Tacle': 753,

            'DofusSideEffect': 984,
        }
    }
}

module.exports = fixtures;