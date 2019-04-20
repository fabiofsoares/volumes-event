export interface EventbriteModel {
	_id?: String;
	event: {
		name: {
			html: String;
		};
		description: {
			html: String;
		};
		start: {
			timezone: String;
			utc: String;
		};
		end: {
			timezone: String;
			utc: String;
		};
		currency: String;
	};
}
