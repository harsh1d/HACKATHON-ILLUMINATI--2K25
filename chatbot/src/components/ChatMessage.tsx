
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  isBot: boolean;
  content: string;
  sections?: string[];
  jailTime?: string;
}

export const ChatMessage = ({ isBot, content, sections, jailTime }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex w-full animate-message-fade mb-4",
        isBot ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={cn(
          "rounded-lg p-4 max-w-[80%] shadow-sm",
          isBot
            ? "bg-legal-light text-legal-accent"
            : "bg-legal-accent text-white"
        )}
      >
        <p className="text-sm md:text-base">{content}</p>
        {isBot && sections && sections.length > 0 && (
          <div className="mt-2 pt-2 border-t border-gray-200">
            <p className="text-xs font-semibold text-legal-muted">Relevant IPC Sections:</p>
            <ul className="list-disc list-inside text-xs space-y-1">
              {sections.map((section, index) => (
                <li key={index}>{section}</li>
              ))}
            </ul>
          </div>
        )}
        {isBot && jailTime && (
          <div className="mt-2 text-xs">
            <span className="font-semibold text-legal-muted">Potential Penalty: </span>
            <span>{jailTime}</span>
          </div>
        )}
      </div>
    </div>
  );
};
