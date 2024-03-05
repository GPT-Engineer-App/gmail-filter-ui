import React, { useState } from "react";
import { Box, Button, Container, Heading, List, ListItem, Stack, Tag, Text, useToast } from "@chakra-ui/react";
import { FaInbox, FaExclamationCircle, FaBullhorn, FaCheck } from "react-icons/fa";

// Simulated email data
const initialEmails = [
  { id: 1, subject: "Welcome to our service!", sender: "service@example.com", label: null },
  { id: 2, subject: "Your invoice is ready", sender: "billing@example.com", label: null },
  { id: 3, subject: "Spammy email about winning a prize", sender: "spam@example.com", label: null },
  // ... more emails
];

const Index = () => {
  const [emails, setEmails] = useState(initialEmails);
  const toast = useToast();

  const labelEmail = (emailId, label) => {
    setEmails(
      emails.map((email) => {
        if (email.id === emailId) {
          return { ...email, label };
        }
        return email;
      }),
    );
    toast({
      title: `Email labeled as ${label}`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const renderLabelIcon = (label) => {
    switch (label) {
      case "Spam":
        return <FaExclamationCircle />;
      case "Low Priority":
        return <FaBullhorn />;
      default:
        return <FaInbox />;
    }
  };

  return (
    <Container maxW="container.md">
      <Heading as="h1" size="xl" my={4}>
        Email Filter
      </Heading>
      <List spacing={3}>
        {emails.map((email) => (
          <ListItem key={email.id} p={3} borderWidth="1px" borderRadius="md" boxShadow="sm">
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Text fontWeight="bold">{email.subject}</Text>
                <Text fontSize="sm">{email.sender}</Text>
              </Box>
              <Stack direction="row" alignItems="center">
                {email.label ? (
                  <Tag size="sm" colorScheme="blue" borderRadius="full">
                    {renderLabelIcon(email.label)}
                    <Text ml={1}>{email.label}</Text>
                  </Tag>
                ) : (
                  <>
                    <Button size="sm" colorScheme="red" onClick={() => labelEmail(email.id, "Spam")}>
                      Spam
                    </Button>
                    <Button size="sm" colorScheme="yellow" onClick={() => labelEmail(email.id, "Low Priority")}>
                      Low Priority
                    </Button>
                    <Button size="sm" colorScheme="green" onClick={() => labelEmail(email.id, "Important")}>
                      Important
                    </Button>
                  </>
                )}
              </Stack>
            </Stack>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Index;
