<?php

namespace App\Http\Controllers;

use App\Http\Requests\DemoRequestRequest;
use App\Models\ActivityLog;
use App\Models\DemoRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class DemoRequestController extends Controller
{
    /**
     * Store a new demo request submission.
     */
    public function store(DemoRequestRequest $request): JsonResponse
    {
        try {
            $demoRequest = DemoRequest::create([
                'full_name'     => $request->validated()['full_name'],
                'school_name'   => $request->validated()['school_name'],
                'email'         => $request->validated()['email'],
                'phone'         => $request->validated()['phone'],
                'school_type'   => $request->validated()['school_type'],
                'student_count' => $request->validated()['student_count'] ?? null,
                'message'       => $request->validated()['message'] ?? null,
                'status'        => 'new',
            ]);

            // Optional: Send notification email to sales team.
            // Uncomment and configure once KRYSTAL_SALES_EMAIL is set in .env
            //
            // $salesEmail = config('app.sales_email');
            // if ($salesEmail) {
            //     Mail::to($salesEmail)->send(new \App\Mail\NewDemoRequest($demoRequest));
            // }

            Log::info('New demo request submitted', [
                'id'          => $demoRequest->id,
                'school_name' => $demoRequest->school_name,
                'email'       => $demoRequest->email,
            ]);

            ActivityLog::record(
                event: 'demo_request',
                description: "{$demoRequest->full_name} from {$demoRequest->school_name} submitted a demo request.",
                userId: null,
                subjectType: DemoRequest::class,
                subjectId: $demoRequest->id,
                properties: ['school_name' => $demoRequest->school_name, 'email' => $demoRequest->email],
            );

            // Sync automatically to the School Management Platform Onboarding Queue
            try {
                $schoolMgtApi = env('SCHOOL_MGT_API_URL', 'https://portal.krystalschool.com.ng/api');
                \Illuminate\Support\Facades\Http::timeout(5)->post("{$schoolMgtApi}/public/school-requests", [
                    'school_name' => $demoRequest->school_name,
                    'contact_name' => $demoRequest->full_name,
                    'email' => $demoRequest->email,
                    'phone' => $demoRequest->phone,
                    'school_type' => $demoRequest->school_type,
                    'student_count' => $demoRequest->student_count,
                    'message' => $demoRequest->message,
                ]);
            } catch (\Throwable $syncEx) {
                Log::warning('Could not sync demo request to school_mgt onboarding queue: ' . $syncEx->getMessage());
            }

            return response()->json([
                'success' => true,
                'message' => 'Thank you! Your demo request has been received. Our team will be in touch shortly.',
            ], 201);
        } catch (\Exception $e) {
            Log::error('Demo request submission failed', ['error' => $e->getMessage()]);

            return response()->json([
                'success' => false,
                'message' => 'Something went wrong. Please try again or contact us directly.',
            ], 500);
        }
    }
}
