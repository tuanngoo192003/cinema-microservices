import React from "react";

type ProviderComponent = React.ComponentType<{ children: React.ReactNode }>;

/**
 * Compose multiple providers into one.
 */
export function composeProviders(providers: ProviderComponent[]): React.FC<{ children: React.ReactNode }> {
  const ComposedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) =>
    providers.reduceRight(
      (acc, CurrentProvider) => React.createElement(CurrentProvider, null, acc),
      children
    );

  return ComposedProvider;
}