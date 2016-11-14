import {
  Component,
  OnInit,
  ElementRef
} from '@angular/core';
import { XYItem } from './xyItem';
import { XYZItem } from './xyzItem';
declare var vis: any;

@Component({
  selector: 'app-root',
  template: `
    <h1>
      VisJs Simple lib for chart generating
    </h1>
    <hr>
    <h2>Simple Line Chart</h2>
    <div id="lineChart"></div>
    <hr>
    <h2>Simple 3d Chart</h2>
    <div id="3dChart"></div>
    <hr>
    <h2>Simple Interpolation Chart</h2>
    <div id="simpleInterpolation"></div>
    <hr>
    <h2>Simple Bar Chart</h2>
    <div id="simpleBarChart"></div>
    <hr>
    <h2>Simple Node Network Chart</h2>
    <div id="simpleNetwork"></div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private domElement: ElementRef) {}

  ngOnInit() {
    const elements = this.domElement.nativeElement,
      simpleChartEl = elements.children[3],
      complextChartEl = elements.children[6],
      interpolationEl = elements.children[9],
      barChartEl = elements.children[12],
      simpleNetworkEl = elements.children[15],
      simpleChartOpts = {
        start: -30,
        end: 30,
        width: '500px',
        height: '552px'
      },
      complexChartOpts = {
        width: '500px',
        height: '552px',
        style: 'surface',
        showPerspective: true,
        showGrid: true,
        showShadow: false,
        keepAspectRatio: true,
        verticalRatio: 0.5
      },
      interpolationOpts = {
        drawPoints: false,
        dataAxis: { visible: false },
        legend: true,
        start: '2014-06-11',
        end: '2014-06-22',
        width: '500px',
        height: '552px'
      },
      barOpts = {
        style: 'bar',
        barChart: { width: 20, align: 'center' }, // align: left, center, right
        drawPoints: false,
        dataAxis: {
            icons: true
        },
        orientation: 'top',
        start: '2014-06-10',
        end: '2014-06-18',
        width: '700px',
        height: '552px'
      },
      simpleNetworkOpts = {
        width: '700px',
        height: '552px',
        nodes: {
          shape: 'dot',
          scaling: {
            label: {
              min: 8,
              max: 20
            }
          }
        }
      };

    new vis.Graph2d(simpleChartEl, this.getLineChartDataSet(), simpleChartOpts); // Simple Chart
    new vis.Graph3d(complextChartEl, this.getComplexChartDataSet(), complexChartOpts); // Simple 3d Canvas Chart
    let interpolation = this.getInterpolationDataSet();
    new vis.Graph2d(interpolationEl, interpolation.dataset, interpolation.groups, interpolationOpts); // Simple interpolation chart
    new vis.Graph2d(barChartEl, this.getBarChartDataSet(), barOpts);
    new vis.Network(simpleNetworkEl, this.getNetworkData(), simpleNetworkOpts);
  }

  private getLineChartDataSet(): XYItem[] {
    const items = [];
    for (let i = -20; i <= 20; i++) {
      let xy = new XYItem();
      xy.x = i;
      xy.y = Math.pow(i, 2);
      items.push(xy);
    }
    return new vis.DataSet(items);
  }

  private getComplexChartDataSet(): XYZItem {
    const data = new vis.DataSet(),
      steps = 50,
      axisMax = 314,
      axisStep = axisMax / steps;

    let counter = 0;

    for (let x = 0; x < axisMax; x += axisStep) {
        for (let y = 0; y < axisMax; y += axisStep) {
            let value = (Math.sin(x / 50) * Math.cos(y / 50) * 50 + 50),
              xyz = new XYZItem();
              xyz.id = counter++;
              xyz.x = x;
              xyz.y = y;
              xyz.z = value;
              xyz.style = value;

            data.add(xyz);
        }
    }

    return data;
  }

  private getInterpolationDataSet(): any {
    const names = ['centripetal', 'chordal', 'uniform', 'disabled'],
      dataset = new vis.DataSet(),
      groups = new vis.DataSet();

    names.forEach((item, i) => {
      let group = {
        id: i,
        content: item,
        options: {
          drawPoints: i === 3 ? { style: 'circle' } : false,
          interpolation: i === 3 ? false : { parametrization: item }
        }
      };
      groups.add(group);
    });

    for (let i = 0; i < names.length; i++) {
      dataset.add([
        { x: '2014-06-12', y: 0 , group: i },
        { x: '2014-06-13', y: 40, group: i },
        { x: '2014-06-14', y: 10, group: i },
        { x: '2014-06-15', y: 15, group: i },
        { x: '2014-06-15', y: 30, group: i },
        { x: '2014-06-17', y: 10, group: i },
        { x: '2014-06-18', y: 15, group: i },
        { x: '2014-06-19', y: 52, group: i },
        { x: '2014-06-20', y: 10, group: i },
        { x: '2014-06-21', y: 20, group: i }
      ]);
    }

    return {
      groups: groups,
      dataset: dataset
    };
  }

  private getBarChartDataSet(): XYItem[] {
    const items = [
      { x: '2014-06-11', y: 10 },
      { x: '2014-06-12', y: 25 },
      { x: '2014-06-13', y: 30 },
      { x: '2014-06-14', y: 10 },
      { x: '2014-06-15', y: 15 },
      { x: '2014-06-16', y: 30 }
    ];

    return new vis.DataSet(items);
  }

  private getNetworkData(): any {
    let nodes = [
        { id: 1,  value: 2,  label: 'Algie' },
        { id: 2,  value: 31, label: 'Alston'},
        { id: 3,  value: 12, label: 'Barney'},
        { id: 4,  value: 16, label: 'Coley' },
        { id: 5,  value: 17, label: 'Grant' },
        { id: 6,  value: 15, label: 'Langdon' },
        { id: 7,  value: 6,  label: 'Lee' },
        { id: 8,  value: 5,  label: 'Merlin' },
        { id: 9,  value: 30, label: 'Mick' },
        { id: 10, value: 18, label: 'Tod' },
      ],
      edges = [
        { from: 2, to: 8, value: 3, title: '3 emails per week' },
        { from: 2, to: 9, value: 5, title: '5 emails per week' },
        { from: 2, to: 10, value: 1, title: '1 emails per week' },
        { from: 4, to: 6, value: 8, title: '8 emails per week' },
        { from: 5, to: 7, value: 2, title: '2 emails per week' },
        { from: 4, to: 5, value: 1, title: '1 emails per week' },
        { from: 9, to: 10, value: 2, title: '2 emails per week' },
        { from: 2, to: 3, value: 6, title: '6 emails per week' },
        { from: 3, to: 9, value: 4, title: '4 emails per week' },
        { from: 5, to: 3, value: 1, title: '1 emails per week' },
        { from: 2, to: 7, value: 4, title: '4 emails per week' }
      ];

      return {
        nodes: nodes,
        edges: edges
      };
  }

}
