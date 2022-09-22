import { useEffect, useState } from "react";
import {
	CardHeader,
	CardBody,
	Card,
	Col,
	Row,
	Button,
	Table,
} from "reactstrap";
import * as XLSX from "xlsx";
import { getData } from "../services/mockData";

export const ExportExcel = () => {
	const [sheetData, setSheetData] = useState(null);

	useEffect(() => {
		setSheetData(getData());
	}, []);

	const handleExport = () => {
		const wb = XLSX.utils.book_new();
		const ws = XLSX.utils.json_to_sheet(sheetData);
		XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
		XLSX.writeFile(wb, "MyExcel.xlsx");
	};
	return (
		<>
			<div className="content">
				<Row>
					<Col md={12}>
						<Card>
							<CardHeader>
								<h5 className="title">Export Table Data</h5>
								<p className="category"></p>
							</CardHeader>
							<CardBody>
								{sheetData && (
									<>
										<Row>
											<Col md={12}>
												<Button onClick={handleExport}>Export</Button>
											</Col>
										</Row>
										<Row>
											<Col md={12}>
												<Table bordered className="border">
													<thead>
														<tr>
															<th>Id</th>
															<th>Nama</th>
															<th>Harga</th>
															<th>Warna</th>
														</tr>
													</thead>
													<tbody>
														{sheetData.map((data) => (
															<tr key={data.id}>
																<td>{data.id}</td>
																<td>{data.name}</td>
																<td>{data.price}</td>
																<td>{data.color}</td>
															</tr>
														))}
														<tr></tr>
													</tbody>
												</Table>
											</Col>
										</Row>
									</>
								)}
							</CardBody>
						</Card>
					</Col>
				</Row>
			</div>
		</>
	);
};
