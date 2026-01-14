export interface HairColor {
  id: string;
  name: string;
  hex: string;
  brand: string;
  line?: string;
  category: 'blonde' | 'brown' | 'red' | 'black' | 'fashion';
  isPremium?: boolean;
  price?: number;
}

export const PROFESSIONAL_COLORS: HairColor[] = [
  {id: 'wella_ash_10', name: 'Extra Light Ash Blonde', hex: '#E8E4D8', brand: 'Wella', line: 'Koleston Perfect', category: 'blonde'},
  {id: 'wella_beige_9', name: 'Light Beige Blonde', hex: '#E6DCCC', brand: 'Wella', line: 'Koleston Perfect', category: 'blonde'},
  {id: 'wella_pearl_10', name: 'Pearl Blonde', hex: '#F0EBE0', brand: 'Wella', line: 'Illumina Color', category: 'blonde'},
  {id: 'wella_honey_8', name: 'Honey Blonde', hex: '#D4B896', brand: 'Wella', line: 'Color Touch', category: 'blonde'},
  {id: 'redken_caramel', name: 'Warm Caramel', hex: '#C68E6F', brand: 'Redken', line: 'Shades EQ', category: 'brown'},
  {id: 'redken_chocolate_5', name: 'Chocolate Brown', hex: '#5C4033', brand: 'Redken', line: 'Color Gels', category: 'brown'},
  {id: 'redken_espresso', name: 'Espresso', hex: '#3E2A1F', brand: 'Redken', line: 'Shades EQ', category: 'brown'},
  {id: 'loreal_mahogany', name: 'Mahogany Brown', hex: '#6B3E2E', brand: "L'Oréal Pro", line: 'Majirel', category: 'brown'},
  {id: 'loreal_copper_7', name: 'Copper Blonde', hex: '#C17C54', brand: "L'Oréal Pro", line: 'Majirel', category: 'red'},
  {id: 'loreal_burgundy', name: 'Burgundy Red', hex: '#800020', brand: "L'Oréal Pro", line: 'Dia Richesse', category: 'red'},
  {id: 'skp_copper', name: 'Intense Copper', hex: '#B87333', brand: 'Schwarzkopf', line: 'Igora Royal', category: 'red'},
  {id: 'skp_auburn', name: 'Auburn Red', hex: '#A52A2A', brand: 'Schwarzkopf', line: 'Igora Royal', category: 'red'},
  {id: 'pravana_violet', name: 'Vivid Violet', hex: '#8B00FF', brand: 'Pravana', line: 'Vivids', category: 'fashion', isPremium: true, price: 22},
  {id: 'pravana_magenta', name: 'Wild Orchid', hex: '#FF00FF', brand: 'Pravana', line: 'Vivids', category: 'fashion', isPremium: true, price: 22},
  {id: 'pravana_blue', name: 'Blue', hex: '#0066CC', brand: 'Pravana', line: 'Vivids', category: 'fashion', isPremium: true, price: 22},
  {id: 'pulp_rose', name: 'Rose Gold', hex: '#B76E79', brand: 'Pulp Riot', line: 'Semi-Permanent', category: 'fashion', isPremium: true, price: 18},
  {id: 'pulp_blush', name: 'Blush', hex: '#FFB6C1', brand: 'Pulp Riot', line: 'Semi-Permanent', category: 'fashion', isPremium: true, price: 18},
  {id: 'pulp_lilac', name: 'Lilac', hex: '#C8A2C8', brand: 'Pulp Riot', line: 'Semi-Permanent', category: 'fashion', isPremium: true, price: 18},
  {id: 'matrix_mocha', name: 'Mocha Brown', hex: '#6F4E37', brand: 'Matrix', line: 'SoColor', category: 'brown'},
  {id: 'matrix_jet', name: 'Jet Black', hex: '#0C0C0C', brand: 'Matrix', line: 'SoColor', category: 'black'},
  {id: 'joico_titanium', name: 'Titanium', hex: '#D3D3D3', brand: 'Joico', line: 'Vero K-PAK', category: 'blonde'},
  {id: 'joico_champagne', name: 'Champagne Blonde', hex: '#F7E7CE', brand: 'Joico', line: 'LumiShine', category: 'blonde'},
];

export const COLOR_CATEGORIES = {
  blonde: PROFESSIONAL_COLORS.filter(c => c.category === 'blonde'),
  brown: PROFESSIONAL_COLORS.filter(c => c.category === 'brown'),
  red: PROFESSIONAL_COLORS.filter(c => c.category === 'red'),
  black: PROFESSIONAL_COLORS.filter(c => c.category === 'black'),
  fashion: PROFESSIONAL_COLORS.filter(c => c.category === 'fashion'),
};
