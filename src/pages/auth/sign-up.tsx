import { zodResolver } from '@hookform/resolvers/zod'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signUpForm = z.object({
  restaurantName: z
    .string({
      required_error: 'Campo obrigatorio',
    })
    .nonempty('Campo obrigatório'),
  managerName: z.string().nonempty('Campo obrigatório'),
  phone: z.string().nonempty('Campo obrigatório'),
  email: z.string().email('E-mail inválido').nonempty('Campo obrigatório'),
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpForm),
  })

  const handleSignUp = async (data: SignUpForm) => {
    try {
      console.log(data)

      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success('Estabelecimento cadastrado com sucesso!.', {
        action: {
          label: 'login',
          onClick: () => navigate('/sign-in'),
        },
      })
    } catch {
      toast.error('Erro ao cadastrar estabelecimento')
    }
  }

  return (
    <>
      <Helmet title="Cadastro" />
      <div className="p-8">
        <Button variant="ghost" asChild className=" absolute right-8 top-8">
          <Link to="/sign-in">Fazer Login</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-between gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>

            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece suas vendas!
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Nome do estabelecimento*</Label>
              <Input
                id="restaurantName"
                type="text"
                {...register('restaurantName')}
              />
              <span className="text-sm font-semibold  tracking-tight text-red-500">
                {errors.restaurantName?.message}
              </span>
            </div>

            <div className="space-y-2">
              <Label htmlFor="managerName">Seu nome*</Label>
              <Input
                id="managerName"
                type="text"
                {...register('managerName')}
              />
              <span className="text-sm font-semibold  tracking-tight text-red-500">
                {errors.managerName?.message}
              </span>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail*</Label>
              <Input id="email" type="email" {...register('email')} />
              <span className="text-sm font-semibold  tracking-tight text-red-500">
                {errors.email?.message}
              </span>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Seu celular*</Label>
              <Input id="phone" type="tel" {...register('phone')} />
              <span className="text-sm font-semibold  tracking-tight text-red-500">
                {errors.phone?.message}
              </span>
            </div>

            <Button className="w-full" type="submit" disabled={isSubmitting}>
              Finalizar cadastro
            </Button>

            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com nossos{' '}
              <a className="underline underline-offset-4" href="">
                termos de serviço
              </a>{' '}
              e{' '}
              <a className="underline underline-offset-4" href="">
                políticas de privacidade.
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
