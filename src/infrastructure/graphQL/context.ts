export type ServiceResolverContext = {
  isAuthenticated: boolean;
  contextCreationError: string;
};

export function validateContext(context: ServiceResolverContext): void {
  console.log(context);
}

export default function initialiseContext() {}
