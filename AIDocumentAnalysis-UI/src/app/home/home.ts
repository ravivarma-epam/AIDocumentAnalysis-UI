import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { AuthService } from '../services/auth-service';
import { AidaService } from '../services/aida-service';
import { ConfigService } from '../services/config-service';
import { Constants } from '../constants';

type PortalMode = 'candidate' | 'recruiter';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  activeMode: PortalMode = 'candidate';
  resumeName = '';
  interviewStarted = false;
  uploaded = false;
  selectedFile: File | null = null;
  isAnalyzing = false;
  analysisResult = '';
  analysisError = '';

  readonly interviews = [
    { title: 'Senior Frontend Engineer', company: 'Aether Labs', stage: 'AI screening', date: 'Today, 4:30 PM', status: 'Ready' },
    { title: 'Platform Engineer', company: 'Northstar Systems', stage: 'Recruiter review', date: 'Tomorrow', status: 'In review' },
  ];

  readonly recruiterInterviews = [
    { title: 'Frontend Engineer - Round 1', candidates: '12 candidates', progress: '68%', updated: 'Updated 18 min ago' },
    { title: 'Backend Engineer - Final', candidates: '6 candidates', progress: '42%', updated: 'Updated yesterday' },
  ];

  constructor(
    private auth: AuthService,
    private router: Router,
    private googleAuth: SocialAuthService,
    private aida: AidaService,
    private config: ConfigService
  ) {}

  setMode(mode: PortalMode): void {
    this.activeMode = mode;
  }

  onResumeSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.selectedFile = file;
      this.resumeName = file.name;
      this.uploaded = true;
      this.analysisResult = '';
      this.analysisError = '';
    }
  }

  analyzeResume(): void {
    if (!this.selectedFile || this.isAnalyzing) {
      return;
    }

    this.isAnalyzing = true;
    this.analysisResult = '';
    this.analysisError = '';
    this.aida.analyzeDocument(
      `${this.config.getaidaUrl()}${Constants.analyzeDocumentUrl}`,
      this.selectedFile
    ).subscribe({
      next: response => {
        this.analysisResult = response.filePath;
        this.isAnalyzing = false;
      },
      error: () => {
        this.analysisError = 'Document analysis failed. Please try again.';
        this.isAnalyzing = false;
      },
    });
  }

  startInterview(): void {
    this.interviewStarted = true;
  }

  async signOut(): Promise<void> {
    this.auth.clearToken();
    try {
      await this.googleAuth.signOut();
    } finally {
      await this.router.navigate(['/login']);
    }
  }

}
