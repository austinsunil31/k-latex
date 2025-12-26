export interface LatexClient {
  id: number;
  client_no: string;
  name: string;
  mobile_num: string;
  plot_location: string;
  created_at: string; // ISO date string from API
  isHandledByClient: boolean
}

export interface ApiResponse {
  data: LatexClient[];
  message: string;
  statusCode: number;
}
