import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import forceGraph from './forceGraph';
import * as d3 from "d3";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {
	@ViewChild("container") container: ElementRef;
	
	constructor() { }

	ngOnInit() { }
	
	ngAfterViewInit() {
		if (!this.container) return;

		const data = {
			nodes: [
				{id: 'a', group: 1},
				{id: 'b', group: 1},
				{id: 'c', group: 2},
				{id: 'd', group: 3},
			],
			links: [
				{source: 'a', target: 'b', value: 1},
				{source: 'b', target: 'c', value: 1},
				{source: 'c', target: 'a', value: 1},
				{source: 'c', target: 'd', value: 1},
			]
		};

		const chartSvg = forceGraph(data, {
			nodeId: d => d.id,
			nodeGroup: d => d.group,
			nodeTitle: d => `${d.id}\n${d.group}`,
			linkStrokeWidth: l => Math.sqrt(l.value)
		});
		d3.select(this.container.nativeElement).node().append(chartSvg);
	}
}
