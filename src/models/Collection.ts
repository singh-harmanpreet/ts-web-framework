import axios, { AxiosResponse } from 'axios';
import { UserProps } from '../interfaces/UserProps';
import { Eventing } from './Eventing';
import { User } from './User';

export class Collection {
	models: User[] = [];
	events: Eventing = new Eventing();

	constructor(public rootURL: string) {}

	get on() {
		return this.events.on;
	}

	get trigger() {
		return this.events.trigger;
	}

	fetch(): void {
		axios.get(this.rootURL).then((response: AxiosResponse) => {
			response.data.forEach((value: UserProps) => {
				const user = User.buildUser(value);
				this.models.push(user);
			});

			this.trigger('change');
		});
	}
}