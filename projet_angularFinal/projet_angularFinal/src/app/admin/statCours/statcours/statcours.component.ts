import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Chart, ChartConfiguration, ChartData } from 'chart.js';

import { Quiz } from 'src/app/FrontEnd/models/Quiz';
import { Cours } from 'src/app/FrontEnd/models/cours';
import { CoursService } from 'src/app/FrontEnd/tuteur/Cours/service/cours.service';
import { QuizService } from 'src/app/FrontEnd/tuteur/Cours/service/quiz.service';

@Component({
  selector: 'app-statcours',
  templateUrl: './statcours.component.html',
  styleUrls: ['./statcours.component.css']
})
export class StatcoursComponent implements OnInit {
  statisticsData: any[] | undefined;
  myChart: any;
  myChartquiz:any;
  quizStatistics: any[] = []; // Initialize as empty array
  quizAverages: Quiz[] | undefined;
  
  cours: Cours []= [];

  constructor(private coursService: CoursService,
    private quizService: QuizService) { }

  ngOnInit(): void {
    this.loadQuizAverages();
    this.fetchStatisticsData();
    this.loadQuizStatistics();
    this.getCoursData();
  }

  fetchStatisticsData() {
    this.coursService.getCoursWithQuizCount().subscribe(
      (data: any[]) => {
        this.statisticsData = data.map(item => [item[0], parseInt(item[1]) || 0]);
        console.log('Données statistiques:', this.statisticsData);
        this.renderChart();
      },
      (error) => {
        console.error('Erreur lors de la récupération des données statistiques:', error);
      }
    );
  }

  renderChart() {
    if (!this.statisticsData) return;
  
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    const labels = this.statisticsData.map(item => item[0]);
    const data = this.statisticsData.map(item => item[1]);
  
    this.myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Quiz Count',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{ 
            ticks: {
              beginAtZero: true,
              stepSize: 1,
            }
          }]
        }
      }
    });
  }


  loadQuizAverages(): void {
    this.quizService.calculateQuizAverages();
    console.log(this.quizService.calculateQuizAverages())
  }

  loadQuizStatistics(): void {
    this.quizService.getQuizStatistics().subscribe(data => {
     
      this.quizStatistics = data.map(item => [item[0], parseInt(item[1]) || 0]);
      console.log('quiz statistiques:', this.quizStatistics);
      this.renderQuizChart();

    });
    
  }


  
  renderQuizChart(): void {
    const ctx = document.getElementById('myChartquiz') as HTMLCanvasElement;
  
    if (!ctx) return; // Null check for ctx
  
    const labels = this.quizStatistics.map(item => item[0]);
    const scores = this.quizStatistics.map(item => item[1]);
  
    this.myChartquiz = new Chart(ctx, {
      type: 'line', // Changement du type de graphique à 'line'
      data: {
        labels: labels,
        datasets: [{
          label: 'Average Score',
          data: scores,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 1,
            }
          }]
        }
      }
    });
  }
  
  getCoursData(): void {
    this.coursService.getCoursWithAverageRatingAndTotalRatings().subscribe(data => {
      this.cours = data;
    console.log(this.cours)
      this.plotChart();
    });
  }
  plotChart(): void {
    const labels = this.cours.map(c => c.title);
    const ratings = this.cours.map(c => c.averageRating);

    new Chart('canvas', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Average Rating',
          data: ratings,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}
  
  

