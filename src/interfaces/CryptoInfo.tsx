export default interface CryptoInfo {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number | null;
    market_cap_rank: number | null;
    fully_diluted_valuation: number | null;
    total_volume: number | null;
    high_24h: number;
    low_24h: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    market_cap_change_24h: number | null;
    market_cap_change_percentage_24h: number | null;
    circulating_supply: number | null;
    total_supply: number | null;
    max_supply: number | null;
    ath: number;
    ath_change_percentage: number;
    ath_date: Date;
    atl: number;
    atl_change_percentage: number;
    atl_date: Date;
    roi: { times: number; currency: string; percentage: number } | null;
    last_updated: Date;
}
