'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import { onboardingSchema } from '@/lib/schemas';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Icons } from '@/components/icons';

type Inputs = z.infer<typeof onboardingSchema>;

export function UpdateProfileForm() {
	const { toast } = useToast();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<Inputs>({
		resolver: zodResolver(onboardingSchema),
		defaultValues: {
			name: 'Pedro',
			lastName: 'Duarte',
			documentType: 'Cédula de ciudadanía',
			id: '1234567890',
			phone: '3001234455',
		},
	});

	async function onSubmit(data: Inputs) {
		setIsLoading(true);
		try {
			//   await signUp(data.email, data.password);
			await new Promise((resolve) => setTimeout(resolve, 1000));
			console.log(data);
			// form.reset();
			//   router.push("/agregar-datos");
		} catch (error) {
			const firebaseError = error as { code?: string };

			switch (firebaseError.code) {
				case 'auth/email-already-in-use':
					toast({
						variant: 'destructive',
						title: 'Error',
						description: 'Este correo ya está registrado',
					});
					break;
				default:
					toast({
						variant: 'destructive',
						title: 'Error',
						description: 'Ocurrió un error al iniciar sesión',
					});
			}
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<Form {...form}>
			<form className="grid gap-4" onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nombre</FormLabel>
							<FormControl>
								<Input placeholder="Pedro" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="lastName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Apellidos</FormLabel>
							<FormControl>
								<Input placeholder="Duarte" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="documentType"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Selecciona el tipo de documento</FormLabel>
							<FormControl>
								<Select value={field.value} onValueChange={(value: typeof field.value) => field.onChange(value)}>
									<SelectTrigger className="w-full shadow-none">
										<SelectValue placeholder={field.value} />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectItem value="Cédula de ciudadanía">Cédula de ciudadanía</SelectItem>
											<SelectItem value="Pasaporte">Pasaporte</SelectItem>
											<SelectItem value="Cédula extranjera">Cédula extranjera</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="id"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Número de documento</FormLabel>
							<FormControl>
								<Input placeholder="1234567890" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="phone"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Número de celular</FormLabel>
							<FormControl>
								<Input placeholder="3001234455" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button className="w-fit" disabled={isLoading}>
					{isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
					Guardar cambios
					<span className="sr-only">Guardar los cambios del perfil</span>
				</Button>
			</form>
		</Form>
	);
}
