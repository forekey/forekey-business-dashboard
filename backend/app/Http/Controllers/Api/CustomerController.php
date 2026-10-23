<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CustomerController extends Controller
{
    /**
     * @return array<string, mixed>
     */
    private function validationRules(?Customer $customer = null): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('customers', 'email')->ignore($customer?->id),
            ],
            'phone' => ['nullable', 'string', 'max:50'],
            'company' => ['nullable', 'string', 'max:255'],
            'status' => ['required', Rule::in(['active', 'inactive'])],
        ];
    }

    public function index(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'page' => ['sometimes', 'integer', 'min:1'],
            'per_page' => ['sometimes', 'integer', 'min:1', 'max:100'],
            'sort' => ['sometimes', 'string', Rule::in([
                'name', 'email', 'phone', 'company', 'status', 'created_at',
            ])],
            'direction' => ['sometimes', 'string', Rule::in(['asc', 'desc'])],
            'search' => ['sometimes', 'nullable', 'string', 'max:255'],
        ]);

        $perPage = $validated['per_page'] ?? 7;
        $sort = $validated['sort'] ?? 'company';
        $direction = $validated['direction'] ?? 'desc';
        $search = isset($validated['search']) ? trim($validated['search']) : '';

        $query = Customer::query();

        if ($search !== '') {
            $term = '%'.$search.'%';
            $query->where(function ($q) use ($term) {
                $q->where('name', 'like', $term)
                    ->orWhere('email', 'like', $term)
                    ->orWhere('company', 'like', $term);
            });
        }

        $customers = $query
            ->orderBy($sort, $direction)
            ->paginate($perPage);

        return response()->json($customers);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate($this->validationRules());

        $customer = Customer::create($data);

        return response()->json($customer, 201);
    }

    public function show(Customer $customer): JsonResponse
    {
        return response()->json($customer);
    }

    public function update(Request $request, Customer $customer): JsonResponse
    {
        $data = $request->validate($this->validationRules($customer));

        $customer->update($data);

        return response()->json($customer->fresh());
    }

    public function destroy(Customer $customer): JsonResponse
    {
        $customer->delete();

        return response()->noContent();
    }
}
