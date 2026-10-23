<?php

namespace Database\Seeders;

use App\Models\Customer;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $customers = [
            [
                'name' => 'Olivia Rhye',
                'email' => 'olivia@catalogapp.io',
                'phone' => '+1 555 010 2001',
                'company' => 'Catalog',
                'status' => 'active',
            ],
            [
                'name' => 'Phoenix Baker',
                'email' => 'phoenix@getcircooles.com',
                'phone' => '+1 555 010 2002',
                'company' => 'Circooles',
                'status' => 'inactive',
            ],
            [
                'name' => 'Lana Steiner',
                'email' => 'lana@cmdr.ai',
                'phone' => '+1 555 010 2003',
                'company' => 'Command+R',
                'status' => 'active',
            ],
            [
                'name' => 'Demi Wilkinson',
                'email' => 'demi@hourglass.app',
                'phone' => '+1 555 010 2004',
                'company' => 'Hourglass',
                'status' => 'active',
            ],
            [
                'name' => 'Candice Wu',
                'email' => 'candice@getlayers.io',
                'phone' => '+1 555 010 2005',
                'company' => 'Layers',
                'status' => 'inactive',
            ],
            [
                'name' => 'Natali Craig',
                'email' => 'natali@quotient.co',
                'phone' => '+1 555 010 2006',
                'company' => 'Quotient',
                'status' => 'active',
            ],
            [
                'name' => 'Drew Cano',
                'email' => 'drew@sisyphus.com',
                'phone' => '+1 555 010 2007',
                'company' => 'Sisyphus',
                'status' => 'active',
            ],
            [
                'name' => 'Aarav Shah',
                'email' => 'aarav.shah@example.com',
                'phone' => '+91 90000 12345',
                'company' => 'Sample Trading Co.',
                'status' => 'active',
            ],
            [
                'name' => 'Mia Laurent',
                'email' => 'mia.laurent@example.com',
                'phone' => '+33 6 12 34 56 78',
                'company' => 'Northwind Studio',
                'status' => 'inactive',
            ],
            [
                'name' => 'Elena Vasquez',
                'email' => 'elena.v@example.com',
                'phone' => '+34 600 111 222',
                'company' => 'Brightline Analytics',
                'status' => 'active',
            ],
        ];

        foreach ($customers as $customer) {
            Customer::updateOrCreate(
                ['email' => $customer['email']],
                $customer,
            );
        }
    }
}
