import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UtilService } from './util.service';
import { HTTPStatus, HttpStatusCode } from '../classes/httpstatus';
import { ApiUrl } from '../classes/common';

describe('UtilService', () => {
	let utilSrv: UtilService;
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ HttpClientTestingModule ]
		});

		utilSrv = TestBed.get(UtilService);
	});

	it('gets app information', async () => {
		const httpMock: HttpTestingController = TestBed.get(HttpTestingController);
		const serverRsp: HTTPStatus = {
			Status: HttpStatusCode.Ok,
			Error: null,
			Message: {
				CustomStyle: "custom.css",
				Title: "My app"
			}
		};

		const reqProm = utilSrv.AppInfo();

		const req = httpMock.expectOne(`${ApiUrl}/util/info`);
		expect(req.request.method).toBe('GET');
		req.flush(serverRsp);

		const infos = await reqProm;

		expect(infos).toEqual(serverRsp.Message);

		httpMock.verify();
	});
});
