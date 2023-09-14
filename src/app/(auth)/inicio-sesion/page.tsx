import Link from 'next/link';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SignInForm } from '@/components/forms/signIn-form';
import { Shell } from '@/components/shell';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function SignInPage() {
	const session = await getServerSession(authOptions);

	if (session) {
		if (!session.user?.name) {
			redirect('/datos-personales');
		}

		console.log('Auth layout email', session.user?.name);

		redirect('/perfil');
	}
	return (
		<Shell className="mx-auto max-w-md">
			<Card>
				<CardHeader className="space-y-1">
					<CardTitle className="text-center text-2xl">Inicia sesión</CardTitle>
				</CardHeader>
				<CardContent className="grid gap-4">
					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<span className="w-full border-t" />
						</div>
					</div>
					<SignInForm />
					{/* <Button variant={"outline"}><Icons.google className="w-4 h-4 mr-2" /> Iniciar con Google</Button> */}
				</CardContent>
				<CardFooter className="grid gap-4 text-center">
					<div className="flex-1 text-sm text-muted-foreground">
						¿No tienes una cuenta?{' '}
						<Link aria-label="Registro" href="/registro" className="text-[#0000EE] underline-offset-4 transition-colors hover:underline">
							Regístrate
						</Link>
					</div>
				</CardFooter>
			</Card>
		</Shell>
	);
}
