<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DemoRequestRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'full_name'     => ['required', 'string', 'max:255'],
            'school_name'   => ['required', 'string', 'max:255'],
            'email'         => ['required', 'email', 'max:255'],
            'phone'         => ['required', 'string', 'max:30'],
            'school_type'   => ['required', 'string', 'max:100'],
            'student_count' => ['nullable', 'string', 'max:50'],
            'message'       => ['nullable', 'string', 'max:2000'],
        ];
    }

    /**
     * Custom validation messages.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'full_name.required'   => 'Please enter your full name.',
            'school_name.required' => 'Please enter your school name.',
            'email.required'       => 'Please enter your email address.',
            'email.email'          => 'Please enter a valid email address.',
            'phone.required'       => 'Please enter your phone number.',
            'school_type.required' => 'Please select your school type.',
        ];
    }
}
