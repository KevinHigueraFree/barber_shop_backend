export interface ServiceSummary {
  id: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

export interface AppointmentServiceSummary {
  id: number;
  service: ServiceSummary;
}

export interface AppointmentWithServices {
  id: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  appointmentServices: AppointmentServiceSummary[];
}
