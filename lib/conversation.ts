import { db } from "./db";

export const getOrCreateConversation = async (
  memberOneId: string,
  memberTwoId: string
) => {
  const existingConversation =
    (await firstConversation(memberOneId, memberTwoId)) ||
    (await firstConversation(memberTwoId, memberOneId));

  if (existingConversation) return existingConversation;

  const newConversation = await createNewConversation(memberOneId, memberTwoId);
  return newConversation;
};

const firstConversation = async (memberOneId: string, memberTwoId: string) => {
  return await db.conversation.findFirst({
    where: {
      AND: [{ memberOneId }, { memberTwoId }],
    },
    include: {
      memberOne: {
        include: {
          profile: true,
        },
      },
      memberTwo: {
        include: {
          profile: true,
        },
      },
    },
  });
};

const createNewConversation = async (
  memberOneId: string,
  memberTwoId: string
) => {
  try {
    return await db.conversation.create({
      data: {
        memberOneId,
        memberTwoId,
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    });
  } catch (error) {
    return null;
  }
};
