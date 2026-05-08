import { query } from '@anthropic-ai/claude-agent-sdk'
import { reviewRubric } from './evals/rubric'

export async function reviewRepositoryChange(prompt: string) {
  const messages = query({
    prompt: `${prompt}\n\nUse this rubric:\n${reviewRubric}`,
    options: {
      allowedTools: ['Read', 'Grep', 'Glob', 'Bash'],
      agents: {
        'qa-reviewer': {
          description: 'Use after reading the diff to identify regression and test risks.',
          prompt: 'You are a QA reviewer. Findings first, then evidence and missing checks.',
          tools: ['Read', 'Grep', 'Glob', 'Bash'],
          model: 'sonnet'
        },
        'security-reviewer': {
          description: 'Use when auth, secrets, hooks, MCP, CI or permissions are touched.',
          prompt: 'You are a security reviewer. Focus on permission boundaries and data exposure.',
          tools: ['Read', 'Grep', 'Glob'],
          model: 'sonnet'
        }
      }
    }
  })

  for await (const message of messages) {
    if ('result' in message) {
      console.log(message.result)
    }
  }
}

if (require.main === module) {
  reviewRepositoryChange(process.argv.slice(2).join(' ') || 'Review the current repository changes.')
}

