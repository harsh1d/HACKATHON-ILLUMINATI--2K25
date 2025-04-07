
export const LoadingDots = () => {
  return (
    <div className="flex space-x-1 mt-4">
      <div className="w-2 h-2 bg-legal-muted rounded-full animate-loading-dots" />
      <div className="w-2 h-2 bg-legal-muted rounded-full animate-loading-dots [animation-delay:0.2s]" />
      <div className="w-2 h-2 bg-legal-muted rounded-full animate-loading-dots [animation-delay:0.4s]" />
    </div>
  );
};
