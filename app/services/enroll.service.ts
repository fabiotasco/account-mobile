import { Injectable } from "@angular/core";
import { Observable as Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { SimCardData } from "~/canonicals/sim-card-data";
import { Api } from "~/canonicals/api";

@Injectable()
export class EnrollService {

	constructor(private http: HttpClient) { }

	enroll(simCardData: SimCardData) {
		return this.http.post(Api.url + "/account/enroll", JSON.stringify(simCardData), { headers: this.createRequestOptions() });
	}

	private createRequestOptions() {
		let headers = new HttpHeaders({
			"Content-Type": "application/json"
		});
		return headers;
	}

}
