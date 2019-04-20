export interface TicketModel {
	_id?: String;
	name: String;
	description: String;
	free: Boolean;
	minimum_quantity: Number;
	maximum_quantity: Number;
	quantity_total: Number;
	has_pdf_ticket: Boolean;
	delivery_methods: String;
}
